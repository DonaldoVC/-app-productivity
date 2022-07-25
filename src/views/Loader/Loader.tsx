import {useMemo} from "react";
import {useSelector} from "react-redux";
import {Oval} from "react-loader-spinner";

import selectLoader from "@selectors/loader.selector";

import styles from './loader.module.scss';

/**
 * Render the loader spider when the dispatch is calling an API.
 */
const LoaderView = () => {

  const loaderSelector = useSelector(selectLoader);

  /**
   * Render the loader spinner or a null element
   */
  return useMemo(() => {
    if (loaderSelector.loading) {
      return (
        <div className={styles.loader}>
          <div>
            <Oval color="#ffffff" secondaryColor="#201F1E" height={100} width={100} visible />
          </div>
        </div>
      )
    }

    return (null);
  }, [loaderSelector.loading]);
}

export default LoaderView;
