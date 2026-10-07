RED    := $(shell tput setaf 1)
GOLD   := $(shell tput setaf 3)
BLUE   := $(shell tput setaf 4)
MAGENTA:= $(shell tput setaf 5)
CYAN   := $(shell tput setaf 6)
DEFAULT:= $(shell tput sgr0)

ADB := ./platform-tools/adb

REMOTE_SUPERBIRD_PATH := /usr/share/qt-superbird-app
REMOTE_WEBAPP_PATH    := $(REMOTE_SUPERBIRD_PATH)/webapp
LOCAL_WEBAPP_PATH     := ./webapp/dist

.DEFAULT_GOAL := help

.PHONY: help device-check shell restore serve backup pull push reboot

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "  shell      Mount rw, back up the device webapp, open an adb shell"
	@echo "  restore    Restore the device webapp from its on-device backup"
	@echo "  serve      Serve ./webapp on http://localhost:8000"
	@echo "  backup     Pull the device webapp into a timestamped ./backup dir"
	@echo "  pull       Mount rw and pull the device webapp into ./"
	@echo "  push       Back up, mount rw, push the local build, restart Chromium"
	@echo "  reboot     Reboot the device"

device-check:
	$(SUPERBIRD)
	@if [ -z "$$($(ADB) devices -l | grep 'spotify-car-thing')" ]; then \
	  echo "$(RED)No device attached. Exiting.$(DEFAULT)"; \
	  exit 1; \
	fi

# Reusable command blocks ------------------------------------------------------

define MOUNT
	$(ADB) shell mount -o remount,rw /
endef

define RESTART_CHROMIUM
	@echo "$(GOLD)Restarting Chromium...$(DEFAULT)"
	$(ADB) shell supervisorctl restart chromium
endef

define BACKUP_LOCAL
	@[ -d ./backup ] || mkdir ./backup
	$(ADB) pull $(REMOTE_WEBAPP_PATH) ./backup/$$(date +"%Y%m%d%H%M%S")/
endef

define BACKUP_WEBAPP_ON_DEVICE
	$(ADB) shell "cd $(REMOTE_SUPERBIRD_PATH) \
	  && [ -f $(REMOTE_SUPERBIRD_PATH)/webapp.bak.tar.xz ] \
	  && echo 'Backup already present on device' \
	  || (echo 'Creating backup on device' \
	  && tar caf ./webapp.bak.tar.xz --directory=webapp .)"
endef

define RESTORE_WEBAPP_ON_DEVICE
	$(ADB) shell "cd $(REMOTE_SUPERBIRD_PATH) \
	  && [ -f $(REMOTE_SUPERBIRD_PATH)/webapp.bak.tar.xz ] \
	  && echo 'Restoring backup on device' \
	  && rm -rf $(REMOTE_SUPERBIRD_PATH)/webapp \
	  && mkdir $(REMOTE_SUPERBIRD_PATH)/webapp \
	  && tar xafm $(REMOTE_SUPERBIRD_PATH)/webapp.bak.tar.xz -C $(REMOTE_SUPERBIRD_PATH)/webapp \
	  || echo 'backup not present on device'"
endef

define SUPERBIRD
	@git submodule update --init --recursive
endef

# Targets ----------------------------------------------------------------------

shell: device-check
	$(MOUNT)
	$(BACKUP_WEBAPP_ON_DEVICE)
	$(ADB) shell

restore: device-check
	$(RESTORE_WEBAPP_ON_DEVICE)
	$(RESTART_CHROMIUM)

serve:
	@echo "$(GOLD)Serving webapp on http://localhost:8000$(DEFAULT)"
	python3 -m http.server 8000 --directory ./webapp

backup: device-check
	$(BACKUP_LOCAL)

pull: device-check
	$(MOUNT)
	$(ADB) pull $(REMOTE_WEBAPP_PATH) ./

push: device-check build
	$(BACKUP_WEBAPP_ON_DEVICE)
	$(BACKUP_LOCAL)
	$(MOUNT)
	$(ADB) push $(LOCAL_WEBAPP_PATH) $(REMOTE_SUPERBIRD_PATH)
	$(ADB) shell rm -rf $(REMOTE_SUPERBIRD_PATH)/webapp/*
	$(ADB) shell cp -R $(REMOTE_SUPERBIRD_PATH)/dist/* $(REMOTE_SUPERBIRD_PATH)/webapp/
	$(ADB) shell rm -rf $(REMOTE_SUPERBIRD_PATH)/dist
	$(RESTART_CHROMIUM)

reboot: device-check
	@echo "$(GOLD)Rebooting device...$(DEFAULT)"
	$(ADB) shell reboot

build:
	@npm run build
