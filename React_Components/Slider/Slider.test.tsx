import React from 'react';
import { render } from '@testing-library/react';

import Slider from '@components/Slider';

describe('Slider Tests', () => {
  describe('Slider set value tests', () => {
    test('Test min value', () => {
      const target = render(<Slider min={10} max={101} value="37" />);
      expect(target.container.firstChild).toHaveAttribute('min', '10');
    });
    test('Test max value', () => {
      const target = render(<Slider min={10} max={101} value="37" />);
      expect(target.container.firstChild).toHaveAttribute('max', '101');
    });
    test('Test current value', () => {
      const target = render(<Slider min={10} max={101} value="37" />);
      expect(target.container.firstChild).toHaveAttribute('value', '37');
    });
    test('Test step value', () => {
      const target = render(<Slider min={10} max={101} value="37" step={30} />);
      expect(target.container.firstChild).toHaveAttribute('step', '30');
    });
  });
  describe('Test default values', () => {
    test('Test default min', () => {
      const target = render(<Slider max={100} />);
      expect(target.container.firstChild).toHaveAttribute('min', '0');
    });
    test('Test default max', () => {
      const target = render(<Slider value="100" />);
      expect(target.container.firstChild).toHaveAttribute('max', '100');
    });
    test('Test default value', () => {
      const target = render(<Slider max={100} />);
      expect(target.container.firstChild).toHaveAttribute('value', '50');
    });
  });
  describe('Test value for illogical inputs', () => {
    test('Test step=float when min=int roundup', () => {
      const target = render(<Slider min={10} max={101} step={5.75} />);
      expect(target.container.firstChild).toHaveAttribute('step', '6');
    });
    test('Test step=float when min=int rounddown', () => {
      const target = render(<Slider min={10} max={101} step={3.2} />);
      expect(target.container.firstChild).toHaveAttribute('step', '3');
    });
    describe('Test for value=NaN', () => {
      test('Test max>min', () => {
        const target = render(<Slider min={10} max={20} />);
        expect(target.container.firstChild).toHaveAttribute('value', '15');
      });
      test('Test max<min', () => {
        const target = render(<Slider min={10} max={0} />);
        expect(target.container.firstChild).toHaveAttribute('value', '10');
      });
    });
    describe('Test for value!=NaN', () => {
      test('Test value<min', () => {
        const target = render(<Slider min={10} max={20} value="5" />);
        expect(target.container.firstChild).toHaveAttribute('value', '10');
      });
      test('Test min<max and max<value', () => {
        const target = render(<Slider min={10} max={20} value="35" />);
        expect(target.container.firstChild).toHaveAttribute('value', '20');
      });
      test('Test value is legit', () => {
        const target = render(<Slider min={10} max={30} value="12" />);
        expect(target.container.firstChild).toHaveAttribute('value', '12');
      });
    });
    describe('Test for step conflicts', () => {
      test('Test for closest step higher', () => {
        const target = render(<Slider value="8" step={10} />);
        expect(target.container.firstChild).toHaveAttribute('value', '10');
      });
      test('Test for closest step lower', () => {
        const target = render(<Slider value="32" step={10} />);
        expect(target.container.firstChild).toHaveAttribute('value', '30');
      });
      test('Test for closest steps equal', () => {
        const target = render(<Slider value="50" step={20} />);
        expect(target.container.firstChild).toHaveAttribute('value', '60');
      });
      test('Test for min', () => {
        const target = render(<Slider value="-10" step={30} />);
        expect(target.container.firstChild).toHaveAttribute('value', '0');
      });
      test('Test for max', () => {
        const target = render(<Slider value="110" step={40} />);
        expect(target.container.firstChild).toHaveAttribute('value', '100');
      });
    });
  });
});
