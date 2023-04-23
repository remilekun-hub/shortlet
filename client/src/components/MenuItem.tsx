interface MenuItemProp {
  title: string;
  onClick: () => void;
}

function MenuItem({ title, onClick }: MenuItemProp) {
  return (
    <div
      onClick={onClick}
      className="px-3 py-2 hover:bg-black/5 cursor-pointer"
    >
      {title}
    </div>
  );
}

export default MenuItem;
