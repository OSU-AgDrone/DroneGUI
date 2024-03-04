import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

function AlertDialog({ popUp, handleCancel, handleOk }) {
    const { t } = useTranslation();

    return (
        <Dialog
            open={popUp}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t("unsavedChangeTitle")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t("unsavedChanges")}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>{t("cancel")}</Button>
                <Button onClick={() => { handleOk();}} autoFocus>
                    {t("ok")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
