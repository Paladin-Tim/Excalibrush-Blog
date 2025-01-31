import { Input } from "antd";
import { useInput } from "../../hooks/useInput";

const { Search } = Input;

export const SearchPanel = () => {
  const searchInput = useInput();

  return (
    <Search
      {...searchInput}
      placeholder="Search posts..."
      size="large"
      onSearch=""
      enterButton
      className="search"
    />
  );
};
