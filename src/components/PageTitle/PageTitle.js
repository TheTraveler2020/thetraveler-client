import useGetRole from 'hook/useGetRole';

import upperFirst from 'lodash/upperFirst';

const PageTitle = () => {
  const { role } = useGetRole();

  document.title = `${upperFirst(role)}`;
  return null;
};

export default PageTitle;
