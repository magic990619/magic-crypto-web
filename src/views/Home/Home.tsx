import React from 'react'
import {
  Container,
  Spacer,
  useTheme,
} from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import useBalances from 'hooks/useBalances'
import useVesting from 'hooks/useVesting'

import MigrationNotice from './components/MigrationNotice'
import Rebase from './components/Rebase'
import RegisterVoteNotice from './components/RegisterVoteNotice'
import Stats from './components/Stats'
import Treasury from './components/Treasury'
import VestingNotice from './components/VestingNotice'

const Home: React.FC = () => {
  const { darkMode } = useTheme()
  const { yamV2Balance } = useBalances()
  const { vestedBalance } = useVesting()
  return (
    <Page>
      <PageHeader
        // icon={darkMode ? "🌚" : "🌞"}
        // subtitle={darkMode ? "🤫 shhh... the YAMs are sleeping." : "It's a great day to farm YAMs!"}
        icon={"🍬"}
        subtitle={"Trick or treat?! Happy Halloween!"}
        title="Welcome to YAM Finance."
      />
      <Container>
        <RegisterVoteNotice />
        <Spacer />
        {(yamV2Balance && yamV2Balance.toNumber() > 0) && (
          <>
            <MigrationNotice />
            <Spacer />
          </>
        )}
        {(vestedBalance && vestedBalance.toNumber() > 0) && (
          <>
            <VestingNotice />
            <Spacer />
          </>
        )}
        <Treasury />
        <Spacer />
        <Split>
          <Rebase />
          <Stats />
        </Split>
      </Container>
    </Page>
  )
}

export default Home
