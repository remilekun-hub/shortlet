interface MenuItemProp {
  title: string;
  onClick: () => void;
}

function MenuItem({ title, onClick }: MenuItemProp) {
  return (
    <div onClick={onClick} className="p-3 hover:bg-black/5 cursor-pointer">
      {title}
    </div>
  );
}

export default MenuItem;
