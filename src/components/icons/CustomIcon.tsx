'use client';
import { DiyaIcon } from './DiyaIcon';
import { LotusIcon } from './LotusIcon';
import { PeacockFeatherIcon } from './PeacockFeatherIcon';

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export function CustomIcon({ name, ...props }: CustomIconProps) {
  switch (name) {
    case 'Lotus':
      return <LotusIcon {...props} />;
    case 'Diya':
      return <DiyaIcon {...props} />;
    case 'Feather':
      return <PeacockFeatherIcon {...props} />;
    default:
      return <LotusIcon {...props} />;
  }
}
