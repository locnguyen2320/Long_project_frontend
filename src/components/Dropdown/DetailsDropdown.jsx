import React from 'react';
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from 'react';
import { UilEllipsisH } from '@iconscout/react-unicons'

function DetailsDropdown(props) {
    const {clickedCategory, setUpdatingCategory} = props
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleUpdateClick(){
        handleClose()
        if(setUpdatingCategory)
            setUpdatingCategory(clickedCategory)
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                < UilEllipsisH />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleUpdateClick}>Update</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
        </div>
    );
}

export default DetailsDropdown;