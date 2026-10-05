# Spotify AnyThing (For CarThing)

![Spotify AnyThing Splash](https://github.com/peledies/spotify-any-thing/blob/main/webapp/images/appstart.png?raw=true)

This is meant to expedite the development process and was specifically written to be run on Mac. I dont see any reason why it wont run on linux as well. If you get it to run, please PM me or create a PR with your harware specs and I'll update the compatibility list.

This has been tested and confirmed to work on the following hardware:

- 2018 Intel Mac Mini macOs 14.5
- 2021 Apple M1 Pro macOs 14.5

## Summary

- Install prerequsites
- Clone this repository
- Prepare a new firmware
- Install the new firmware
- Modify the webapp
- Profit

## Prerequsites

Brew install the libusb package

```
brew install libusb
```

Install python dependencies inside a virtual environment

```
python3 -m venv venv \
  && . /venv/bin/activate \
  && pip3 install -r requirements.txt
```

## Clone this project

> Make sure you have the `--recurse-submodules` at the end so you get the
> dependant submodules.

```
git clone git@github.com:peledies/spotify-any-thing.git --recurse-submodules
```

## Prepare a Firmware

Use the provided helper script to get a new patched firmware.

```
./prepare_firmware.sh
```

## The Hack

You only have to do this once per device. After you have done this you can jump straight to using the `make` commands.

- hold buttons 1 & 4
- plug in CarThing

> NOTE: This may fail several times but it will eventualy make it all the way
> through the process. It took 4 tries for me. ProTip: dont let your computer
> go to sleep durring this process

```
./prepare_device.sh
```

## The Makefile

ADB is included in this repository and can be used on its own to interact with the CarThing. However the included `Makefile` will do pretty much everything you need with fewer keystrokes.

Run `make` or `make help` from the project root to list the available targets:

```
make help
```

Create a local backup in the `backup` directory from the contents of the CarThings webapp

```
make backup
```

Serve the `./webapp` directory on port `8000`. You can go to `http://localhost:8000` to preview your local webapp before pushing. (ctl-c to exit)

```
make serve
```

Pull the contents of the webapp directory from the CarThing to your current working directory

```
make pull
```

Push the contents of your `./webapp/dist` build to the CarThing and restart Chromium

```
make push
```

Restore the device webapp from its on-device backup

```
make restore
```

Open a shell to the CarThing

```
make shell
```

Reboot the CarThing

```
make reboot
```
