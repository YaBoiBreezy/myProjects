import React from 'react';

import '../../style.css';

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The value of the Slider */
  value?: string;
  /** The upper limit of the Slider */
  max?: number;
  /** The lower limit of the Slider */
  min?: number;
  /** The precision of the Slider */
  step?: number;
  /** The tile of the Slider, for displaying to user */
  title?: string;
  /** The name of the Slider */
  name?: string;
  /** The id of the Slider */
  id?: string;
}

const Slider = ({
  max = 100,
  min = 0,
  value = 'NaNey',
  step = 1,
  title = '',
  name = '',
  id = '',
}: SliderProps) => {
  const sterilizedStep = min % 1 === 0 ? Math.round(step) : step; // if min is integer, step must be integer
  const sterilizedValue = Number.isNaN(Number(value)) // if value is legit, check min max bounds. Otherwise set to min or middle
    ? max > min
      ? min + (max - min) / 2
      : min
    : Number(value) < min
    ? min
    : max > min && Number(value) > max
    ? max
    : Number(value);
  const nextHighestNonsterilized =
    sterilizedStep * Math.ceil((sterilizedValue - min) / sterilizedStep) + min; // handle step conflicts by finding closest 2 valid steps, choosing closer or bigger
  const nextLowestNonsterilized =
    sterilizedStep * Math.floor((sterilizedValue - min) / sterilizedStep) + min;
  const nextHighest =
    nextHighestNonsterilized > max ? max : nextHighestNonsterilized;
  const nextLowest =
    nextLowestNonsterilized < min ? min : nextLowestNonsterilized;
  const sterilizedValue2 =
    (sterilizedValue - min) % sterilizedStep === 0
      ? sterilizedValue
      : nextHighest - sterilizedValue <= sterilizedValue - nextLowest
      ? nextHighest
      : nextLowest;

  return (
    <input
      name={name}
      id={id}
      type="range"
      min={min}
      max={max}
      step={sterilizedStep}
      title={title}
      defaultValue={sterilizedValue2} // NOTE: due to using react you must use defaultValue, as setting value locks the slider
    />
  );
};

export default Slider;
