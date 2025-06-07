import PropertyGrid from './components/card/PropertyGrid';
import Layout from './components/layout/Layout';
import SearchForm from './components/search/SearchForm';

function App() {
  return (
    <>
      <Layout>
        <h1 className="max-w-[1280px] mx-auto px-4 text-3xl font-bold text-navy-900 mt-8 mb-8">
          부동산 서비스
        </h1>
        <SearchForm />
        <PropertyGrid />
      </Layout>
    </>
  );
}

export default App;
