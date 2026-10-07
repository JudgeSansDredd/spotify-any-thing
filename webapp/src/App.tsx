import { useState } from 'react';
import Welcome from './Page/Welcome';
import ButtonLabel from './components/ButtonLabel';
import Layout from './layout';
import {
  Buttons,
  type LabelableButtons,
  WheelDirection,
  useKeyDown,
  useKeyUp,
  useWheel,
} from './utils/ButtonHelper';

export default function App() {
  return <Welcome />;
}
