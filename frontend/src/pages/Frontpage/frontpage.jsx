import React from 'react';

import FrontpageContainer from './FrontpageContainer';
// eslint-disable-next-line import/no-named-as-default
import Index from './index';

// This component is what is rendered for the frontpage route
//
// The frontpage container contains the the logic and state for the page itself.
// It also handles any data retrived from the backend through the service layer.
export default () => {
  return (
    <FrontpageContainer>
      <Index />
    </FrontpageContainer>
  );
};
