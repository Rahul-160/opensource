import React, { Component } from 'react'
import Layout from '../components/layout'
import TopBackground from '../components/top-background'
import Button from '../components/button'
import Spinner from '../components/spinner'
import { getOrgMembers } from '../services/github'

import styles from './nosso-time.module.css'

class NossoTimePage extends Component {
  state = {
    members: [],
    isLoading: true,
  }

  async componentDidMount() {
    const data = await getOrgMembers()
    if (data) {
      this.setState({
        members: data.organization.members.nodes,
        isLoading: false,
      })
    }
  }

  render() {
    const { members, isLoading } = this.state
    return (
      <Layout renderTop={() => <TopBackground skyObject="moon" />}>
        <section className={styles.section}>
          <h1 className={styles.head}>Nosso Time</h1>
          {isLoading && <Spinner message="Carregando membros do time ..." />}
          <div className={styles.members}>
            {members.map(member => (
              <div className={styles.member} key={member.id}>
                <div className={styles.memberAnchor}>
                  <img
                    className={styles.memberAvatar}
                    src={member.avatarUrl}
                    alt={member.name}
                    title={member.name}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button
            className={styles.button}
            label="trabalhe conosco"
            url="https://talentos.globo.com/"
          />
        </section>
      </Layout>
    )
  }
}

export default NossoTimePage
