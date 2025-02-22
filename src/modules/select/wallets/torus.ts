import { networkName } from '../../../utilities'
import { Helpers, TorusOptions, WalletModule } from '../../../interfaces'

import torusIcon from '../wallet-icons/icon-torus'

function torus(options: TorusOptions & { networkId: number }): WalletModule {
  const {
    networkId,
    preferred,
    label,
    iconSrc,
    svg,
    buttonPosition,
    modalZIndex,
    apiKey,
    buildEnv,
    enableLogging,
    enabledVerifiers,
    loginConfig,
    showTorusButton,
    integrity,
    whiteLabel,
    loginMethod,
    rpcUrl
  } = options

  let account: string

  return {
    name: label || 'Torus',
    svg: svg || torusIcon,
    iconSrc,
    wallet: async (helpers: Helpers) => {
      const { createModernProviderInterface } = helpers

      const { default: Torus } = await import('@toruslabs/torus-embed')
      const instance = new Torus({
        buttonPosition, // default: bottom-left
        modalZIndex,
        apiKey
      })

      await instance.init({
        buildEnv, // default: production
        enableLogging, // default: false
        network: {
          host: rpcUrl || networkName(networkId), // default: mainnet
          chainId: networkId, // default: 1
          networkName: `${networkName(networkId)} Network` // default: Main Ethereum Network
        },
        showTorusButton: showTorusButton, // default: true
        enabledVerifiers: enabledVerifiers,
        loginConfig,
        integrity,
        whiteLabel
      })

      const provider = instance.provider

      return {
        provider,
        interface: {
          ...createModernProviderInterface(provider),
          name: 'Torus',
          dashboard: () => instance.showWallet('home'),
          connect: async () => {
            const result = await instance.login({ verifier: loginMethod })
            account = result[0]
            return { message: result[0] }
          },
          disconnect: () => instance.cleanUp()
        },
        instance
      }
    },
    type: 'sdk',
    desktop: true,
    mobile: true,
    preferred
  }
}

export default torus