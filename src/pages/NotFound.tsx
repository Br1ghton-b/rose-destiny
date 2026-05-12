import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="container-x py-20 sm:py-28 lg:py-32 text-center">
        <div className="font-display text-[140px] md:text-[200px] gold-text leading-none">404</div>
        <h1 className="font-display text-4xl md:text-5xl italic text-rouge -mt-4">A petal lost its way</h1>
        <p className="mt-5 text-ink/60 max-w-md mx-auto">
          We could not find what you were looking for. Return to the studio and try another path.
        </p>
        <Link to="/" className="btn-primary mt-10 inline-flex">Take me home</Link>
      </div>
    </PageWrapper>
  );
}
