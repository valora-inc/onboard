import { WalletConnectOptions, WalletModule } from '../../../interfaces'

import valoraIcon from '../wallet-icons/icon-valora'

import walletConnect from './wallet-connect'

function valora(
  options: WalletConnectOptions & { networkId: number }
): WalletModule {
  return walletConnect({
    label: 'Valora',
    svg: valoraIcon,
    ...options
  })
}

export default valora
