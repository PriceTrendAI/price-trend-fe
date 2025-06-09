import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import SearchForm from './components/search/SearchForm';

function App() {
  return (
    <>
      <Toaster />
      <Layout>
        <SearchForm />
      </Layout>
    </>
  );
}

export default App;
