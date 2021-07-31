import { Trans } from '@lingui/macro';
import {
  Card,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { Button, ConfirmDialog, Flex, Link, Logo } from '@spare/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useOpenDialog from '../../hooks/useOpenDialog';
import {
  check_delete_key_action,
  delete_all_keys,
  delete_key,
  get_private_key,
  login_action,
} from '../../modules/message';
import { resetMnemonic } from '../../modules/mnemonic';
import { closeProgress, openProgress } from '../../modules/progress';
import type { RootState } from '../../modules/rootReducer';
import type Fingerprint from '../../types/Fingerprint';
import LayoutHero from '../layout/LayoutHero';

const StyledFingerprintListItem = styled(ListItem)`
  padding-right: ${({ theme }) => `${theme.spacing(11)}px`};
`;

export default function SelectKey() {
  const dispatch = useDispatch();
  const openDialog = useOpenDialog();
  const publicKeyFingerprints = useSelector(
    (state: RootState) => state.wallet_state.public_key_fingerprints,
  );
  const hasFingerprints =
    publicKeyFingerprints && !!publicKeyFingerprints.length;

  async function handleClick(fingerprint: Fingerprint) {
    await dispatch(resetMnemonic());
    await dispatch(login_action(fingerprint));
  }

  function handleShowKey(fingerprint: Fingerprint) {
    dispatch(get_private_key(fingerprint));
  }

  async function handleDeletePrivateKey(fingerprint: Fingerprint) {
    dispatch(openProgress());
    const response: any = await dispatch(check_delete_key_action(fingerprint));
    dispatch(closeProgress());

    const deletePrivateKey = await openDialog(
      <ConfirmDialog
        title={<Trans>Delete key {fingerprint}</Trans>}
        confirmTitle={<Trans>Delete</Trans>}
        cancelTitle={<Trans>Back</Trans>}
        confirmColor="danger"
      >
        {response.used_for_farmer_rewards && (
          <Alert severity="warning">
            <Trans>
              Warning: This key is used for your farming rewards address. By
              deleting this key you may lose access to any future farming
              rewards
            </Trans>
          </Alert>
        )}

        {response.used_for_pool_rewards && (
          <Alert severity="warning">
            <Trans>
              Warning: This key is used for your pool rewards address. By
              deleting this key you may lose access to any future pool rewards
            </Trans>
          </Alert>
        )}

        {response.wallet_balance && (
          <Alert severity="warning">
            <Trans>
              Warning: This key is used for a wallet that may have a non-zero
              balance. By deleting this key you may lose access to this wallet
            </Trans>
          </Alert>
        )}

        <Trans>
          Deleting the key will permanently remove the key from your computer,
          make sure you have backups. Are you sure you want to continue?
        </Trans>
      </ConfirmDialog>,
    );

    // @ts-ignore
    if (deletePrivateKey) {
      dispatch(delete_key(fingerprint));
    }
  }

  async function handleDeleteAllKeys() {
    const deleteAllKeys = await openDialog(
      <ConfirmDialog
        title={<Trans>Delete all keys</Trans>}
        confirmTitle={<Trans>Delete</Trans>}
        cancelTitle={<Trans>Back</Trans>}
        confirmColor="danger"
      >
        <Trans>
          Deleting all keys will permanently remove the keys from your computer,
          make sure you have backups. Are you sure you want to continue?
        </Trans>
      </ConfirmDialog>,
    );

    // @ts-ignore
    if (deleteAllKeys) {
      dispatch(delete_all_keys());
    }
  }

  return (
    <LayoutHero>
      <Container maxWidth="xs">
        <Flex flexDirection="column" alignItems="center" gap={3}>
          <Logo />
          {hasFingerprints ? (
            <Typography gutterBottom>
              <span
                style={{ fontSize: 32, fontWeight: 500, fontFamily: 'Josefin' }}
              >
                <Trans>Wallets</Trans>
              </span>
            </Typography>
          ) : (
            <>
              <Typography variant="h5" component="h1" gutterBottom>
                <Trans>Sign In</Trans>
              </Typography>
              <Typography variant="subtitle1">
                <Trans>
                  Welcome to Spare. Please log in with an existing key, or
                  create a new key.
                </Trans>
              </Typography>
            </>
          )}
          <Flex
            flexDirection="column"
            gap={3}
            alignItems="stretch"
            alignSelf="stretch"
          >
            {hasFingerprints && (
              <Card>
                <List>
                  {publicKeyFingerprints.map((fingerprint: Fingerprint) => (
                    <StyledFingerprintListItem
                      onClick={() => handleClick(fingerprint)}
                      key={fingerprint}
                      button
                    >
                      <ListItemText
                        primary={
                          <>
                            <Trans>Private key with public fingerprint</Trans>
                            <Typography gutterBottom>
                              <span style={{ color: '#E9398D' }}>
                                {fingerprint}
                              </span>
                            </Typography>
                          </>
                        }
                        secondary={
                          <Trans>Can be backed up to mnemonic seed</Trans>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title={<Trans>See private key</Trans>}>
                          <IconButton
                            edge="end"
                            aria-label="show"
                            onClick={() => handleShowKey(fingerprint)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={
                            <Trans>
                              DANGER: permanently delete private key
                            </Trans>
                          }
                        >
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeletePrivateKey(fingerprint)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </StyledFingerprintListItem>
                  ))}
                </List>
              </Card>
            )}
            <Link to="/wallet/add">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                <Trans>Create a new private key</Trans>
              </Button>
            </Link>
            <Link to="/wallet/import">
              <Button type="submit" variant="contained" size="large" fullWidth>
                <Trans>Import from Mnemonics (24 words)</Trans>
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </LayoutHero>
  );
}
