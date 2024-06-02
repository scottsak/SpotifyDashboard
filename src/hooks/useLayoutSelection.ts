import { useEffect, useState } from 'react';
import { LAYOUT_SELECTIONS } from '../lib/enums';

const useLayoutSelection = (): {
  layoutSelection: string;
  setLayoutSelection: (layout: string) => void;
} => {
  const [layoutSelection, setLayoutSelection] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    chrome.runtime.sendMessage({ type: 'getLayoutSelection' }, (response) => {
      console.log(response, 'response CE:TEST');
      if (!isMounted) {
        return;
      }
      if (response && LAYOUT_SELECTIONS.includes(response)) {
        setLayoutSelection(response);
      } else {
        setLayoutSelection('default');
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (layoutSelection && LAYOUT_SELECTIONS.includes(layoutSelection)) {
      chrome.runtime.sendMessage({
        type: 'setLayoutSelection',
        payload: { layoutSelection },
      });
    }
  }, [layoutSelection]);
  return { layoutSelection, setLayoutSelection };
};

export default useLayoutSelection;
