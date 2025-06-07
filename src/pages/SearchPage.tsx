import Layout from '../components/layout/Layout';
import SearchForm from '../components/search/SearchForm';
import SearchResult from '../components/search/SearchResult';

export default function SearchPage() {
  return (
    <Layout>
      <SearchForm />
      <SearchResult />
    </Layout>
  );
}
