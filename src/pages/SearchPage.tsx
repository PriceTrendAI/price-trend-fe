import Layout from '../components/layout/Layout';
import SearchForm from '../components/search/SearchForm';
import SearchResult from '../components/search/SearchResult';

export default function SearchPage() {
  return (
    <Layout>
      <h1 className="max-w-[1280px] mx-auto px-4 text-3xl font-bold text-navy-900 mt-8 mb-8">
        부동산 서비스
      </h1>
      <SearchForm />
      <SearchResult />
    </Layout>
  );
}
