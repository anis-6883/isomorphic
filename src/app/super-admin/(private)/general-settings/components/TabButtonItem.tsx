export default function TabButtonItem({ tab, onClick, active }) {
  const classNames = `uppercase cursor-pointer ${
    !active && 'btn-outline'
  } btn btn-primary btn-sm rounded-md mb-2`;

  return (
    <div onClick={onClick} className={classNames}>
      {tab}
    </div>
  );
}
