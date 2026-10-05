import { useState } from 'react';
import ButtonLabel from './components/ButtonLabel';
import Layout from './layout';
import {
  Buttons,
  LabelableButtons,
  useKeyDown,
  useKeyUp,
  useWheel,
  WheelDirection,
} from './utils/ButtonHelper';
import Welcome from './Page/Welcome';

export default function App() {
  return <Welcome />;
}
