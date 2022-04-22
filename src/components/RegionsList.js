import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllData, resetRegionsState } from '../redux/regions/regions';
import LoadingTimer from './LoadingTimer';
import RegionsItem from './RegionsItem';

function RegionsList({ countryName }) {
  const { status, data } = useSelector((state) => state.regions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllData(countryName));

    return () => dispatch(resetRegionsState());
  }, []);

  return (
    <>
      {status !== 'fetched' && (
        <div className="p-8 grid place-content-center">
          {status === 'not fetched' && <>No data fetched yet!</>}
          {status === 'fetching' && <LoadingTimer />}

          {status === 'failed' && (
            <>Failed in fetching data!</>
          )}

        </div>
      )}

      {status === 'fetched' && data.length === 0 && (
        <div className="p-8 grid place-content-center">No regional data available!</div>
      )}
      {status === 'fetched' && (
        <ul className="flex flex-col">
          {data.map((region, index) => (
            <RegionsItem key={region.id} region={region} index={index} />
          ))}
        </ul>
      )}
    </>
  );
}

RegionsList.propTypes = {
  countryName: PropTypes.string.isRequired,
};

export default RegionsList;
