import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingTimer from '../components/LoadingTimer';
import RegionList from '../components/RegionsList';
import { getMapUrl } from '../assets/getMaps';

const TotalStat = ({ status, meta }) => (
  <>
    {status !== 'fetched' && (
      <>
        {status === 'not fetched' && <>...</>}
        {status === 'fetching' && <LoadingTimer size="w-4 h-4" />}

        {status === 'failed' && (
          <>Error!</>
        )}
      </>
    )}
    {status === 'fetched' && (
      <>{meta.stat}</>
    )}
  </>
);

function CountryPage() {
  const { status, meta } = useSelector((state) => state.regions);
  let { countryName } = useParams();

  const imageUrl = getMapUrl(countryName);
  countryName = countryName.replaceAll('_', ' ');

  const classBefore = 'opacity-0 translate-y-8';
  const classAfter = 'opacity-100';
  const [classCurrent, setClassCurrent] = useState(classBefore);

  useEffect(() => {
    setClassCurrent(classAfter);
    return () => {
      setClassCurrent(classBefore);
    };
  }, []);

  return (
    <main className={`container mx-auto flex flex-col grow transition-all duration-500 ${classCurrent}`}>
      <div className="h-48 md:h-64 grid place-content-center">
        <div className="flex items-center gap-4">
          <div
            className="w-40 h-40 z-0 opacity-20"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <div className="flex flex-col">
            <h2 className="text-3xl uppercase font-bold">
              {countryName}
            </h2>
            <p className="text-sm mt-4 uppercase">
              Confirmed cases
              <br />
              of today:
            </p>
            <div className="text-xl font-bold">
              <TotalStat status={status} meta={meta} />
            </div>
          </div>
        </div>
        <div className="text-center pb-2 lg:text-lg inline-block bg-transparent">
          Source: John Hopkins University
        </div>
      </div>
      <div className="bg-pink-500 grow rounded-3xl border border-pink-600 w-full max-w-2xl mx-auto">
        <div className="p-2 text-center uppercase font-bold">Region/State/City</div>
        <RegionList countryName={countryName.toLowerCase()} />
        <div className="h-4" />
      </div>
    </main>
  );
}

TotalStat.propTypes = {
  status: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    stat: PropTypes.number.isRequired,
  }).isRequired,
};

export default CountryPage;
