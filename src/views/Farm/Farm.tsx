import React, { useMemo } from 'react'

import {
  Box,
  Button,
  Container,
  Separator,
  Spacer,
} from 'react-neu'

import { useWallet } from 'use-wallet'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import useFarming from 'hooks/useFarming'

import HarvestCard from './components/Harvest'
import StakeCard from './components/Stake'
import PausedLPsNotice from './components/PausedLPsNotice'
import ResumedLPsNotice from './components/ResumedLPsNotice'
import HarvestLPsNoticeYAMYUSD from './components/HarvestLPsNoticeYAMYUSD'

const Farm: React.FC = () => {
  const { status } = useWallet()
  const {
    isRedeeming,
    onRedeemYAMETH,
  } = useFarming()

  const RedeemButton = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          text="Harvest &amp; Unstake YAM/ETH"
          variant="secondary"
        />
      )
    }
    if (!isRedeeming) {
      return (
        <Button
          onClick={onRedeemYAMETH}
          text="Harvest &amp; Unstake YAM/ETH"
          variant="secondary"
        />
      )
    }
    return (
      <Button
        disabled
        text="Redeeming..."
        variant="secondary"
      />
    )
  }, [
    isRedeeming,
    onRedeemYAMETH,
  ])

  return (
    <Page>
      <PageHeader
        icon="🍠"
        subtitle="Temporary farm if you want to remove stake"
        title="Temporary YAM/ETH Farm"
      />
      <Container>
        {/* <HarvestLPsNoticeYAMYUSD /> */}
        {/* <ResumedLPsNotice /> */}
        {/* <PausedLPsNotice /> */}
        <Split>
          <StakeCard />
          <HarvestCard />
        </Split>
        <Spacer />
        <Box row justifyContent="center">
          {RedeemButton}
        </Box>
      </Container>
    </Page>
  )
}

export default Farm