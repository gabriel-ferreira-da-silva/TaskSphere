import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
export function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
}
