import { Slider } from '@mui/material';
import React from 'react';
import { NumToTime } from '../utils/converterNumberToMinute';

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e) => void;
    width: number;
    time?: boolean;
}

const TrackProgress: React.FC<TrackProgressProps> =
    ({
        left, right, onChange, width = 100, time
    }) => {

        
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {time  && <div>{NumToTime(left)}</div>}
                <Slider
                    aria-label="Temperature"
                    min={0}
                    max={right}
                    value={left}
                    color="primary"
                    onChange={onChange}
                    size="small"
                    style={{width: width, margin: '0 10px'}}
                />
               {time  && <div>{NumToTime(right)}</div>}
            </div>
        );
    };

export default TrackProgress;
