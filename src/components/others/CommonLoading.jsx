import { THEME } from '@theme/index'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const LoadingHolder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh; 
`;

const SpinnerIcon = styled(FontAwesomeIcon)`
    font-size: 5rem;
    color: ${THEME.secondary_color_dark};
`;

const CommonLoading = () => {
    return (
        <LoadingHolder>
            <SpinnerIcon icon={faSpinner} spin />
        </LoadingHolder>
    );
};

export default CommonLoading;
