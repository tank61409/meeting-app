import React from 'react';

interface ActionButtonProps {
  label: string;
  icon: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon }) => {
  return (
    <div className="flex flex-col flex-1 px-7 pt-5 pb-3 text-2xl text-center text-white whitespace-nowrap rounded-xl bg-neutral-700">
      <div className="flex shrink-0 self-center rounded-2xl bg-neutral-700 h-[84px] w-[84px]" role="img" aria-label={`${icon} icon`} />
      <div className="mt-3.5">{label}</div>
    </div>
  );
};

export default ActionButton;