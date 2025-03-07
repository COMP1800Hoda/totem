import styled from 'styled-components';

const Component = styled.div`
  font-weight: bold;
`;

type SearchResultHeaderProps = {
  keyword: string;
  resultCount: number;
};

const SearchResultHeader = ({
  keyword = '',
  resultCount = 0,
}: SearchResultHeaderProps) => {
  return <Component>{`${resultCount} results for '${keyword}'`}</Component>;
};

export default SearchResultHeader;
