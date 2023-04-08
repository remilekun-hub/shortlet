import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import { TextInput, Title, Flex, Icon } from "@tremor/react";

const SearchIcon = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
};
const BellIcon = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
      />
    </svg>
  );
};

function Dashboard() {
  return (
    <section className="flex">
      <aside className="px-3 bg-violet-100 h-screen hidden lg:block duration-300 transition-[display] ease-out">
        <Sidebar />
        <p className="bg-[#3A36DB] mb-4 py-3 px-3 rounded-[6px] text-white ">
          remilekun
        </p>
      </aside>
      <div className="flex-1 p-4">
        <Flex>
          <Title className="font-bold text-2xl">Dashboard</Title>
          <div>
            <TextInput
              icon={SearchIcon}
              placeholder="Search..."
              className="px-2 max-w-[300px]"
            />
          </div>
          <p>Welcome, Remi</p>
          <Icon
            icon={BellIcon}
            variant="outlined"
            size="sm"
            className="cursor-pointer"
          />
        </Flex>

        <Outlet />
      </div>
    </section>
  );
}

export default Dashboard;
