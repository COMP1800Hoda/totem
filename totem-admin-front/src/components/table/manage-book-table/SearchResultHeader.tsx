import styled from 'styled-components';

const Component = styled.div`
  font-size: 20px;
  padding: 0 16px;
  margin-bottom: 20px;
`;

type SearchResultHeaderProps = {
  // keyword: string;
  resultCount: number;
};

const SearchResultHeader = ({
  // keyword = '',
  resultCount = 0,
}: SearchResultHeaderProps) => {
  // return <Component>{`${resultCount} results for '${keyword}'`}</Component>;
  return <Component>{`${resultCount} results`}</Component>;
};
export default SearchResultHeader;
