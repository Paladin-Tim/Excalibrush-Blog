import { Breadcrumb } from "antd";
import { useMatches } from "react-router-dom";
import "./PageContent.scss";

export const PageContent = ({ children }) => {
  let matches = useMatches();
  let crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.params.id));

  const crumbItems = crumbs.map((crumb) => ({ title: crumb }));

  return (
    <main className="content">
      <Breadcrumb items={crumbItems} />
      {children}
    </main>
  );
};
