import './loading.css';

function Loading({ isMain = false }) {
  return (
    <div className={isMain ? 'loading' : 'page-loading'}>
      <div className="container">
        <h1 className="loading__title">Идет загрузка</h1>
      </div>
    </div>
  );
}

export { Loading };
