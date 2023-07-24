import { ReactNode } from 'react';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type IHeading = {
  children: ReactNode;
  className?: string;
  as: HeadingType;
};

const defaultStyling: Record<HeadingType, string> = {
  h1: 'text-4xl font-semibold',
  h2: 'text-3xl font-semibold',
  h3: 'text-xl font-semibold',
  h4: 'text-base font-semibold',
  h5: 'text-sm font-bold',
  h6: 'text-xs font-bold',
};

const Heading = ({
  children,
  as: Element = 'h1',
  className,
  ...rest
}: IHeading) => (
  <Element
    className={`${defaultStyling[Element]} ${className} text-text-primary`}
    {...rest}
  >
    {children}
  </Element>
);

export default Heading;
