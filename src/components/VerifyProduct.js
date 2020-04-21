import React from 'react'
import FormSubmit from './FormSubmit'
import FormTitle from './FormTitle'
import FormTextInput from './FormTextInput'
import FormLabel from './FormLabel'
import FormField from './FormField'
import FormFieldHeading from './FormFieldHeading'
import ErrorMessage from './ErrorMessage'

export default function VerifyProduct({ submitData }) {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [user, setUser] = React.useState('none')
  const [activeSection, setActiveSection] = React.useState('basic-info')
  const [hash, setHash] = React.useState('')
  const [maker, setMaker] = React.useState('none')
  const [marketPlace, setMarketPlace] = React.useState(null)
  const [status, setStatus] = React.useState(null)
  const [hasConnection, setHasConnection] = React.useState(navigator.onLine)
  const [verifyProduct, setVerifyProduct] = React.useState(false)

  const onChangeMarketPlace = event => setMarketPlace(event.target.value)

  const verifyData = () => {
    setStatus('loading')
    setTimeout(() => {
      setStatus('completed')
    }, 3000)
  }

  React.useEffect(() => {
    const handleOnline = () => setHasConnection(true)
    const handleOffline = () => setHasConnection(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div>
      <FormTitle>KYP Verify the Authenticity of your product</FormTitle>

      <Section isVisible={activeSection === 'basic-info'}>
        <SectionHeading>Enter your information</SectionHeading>

        <FormField>
          <FormFieldHeading>
            <FormLabel htmlFor='input-name' text='Name' />
          </FormFieldHeading>
          <FormTextInput
            id='input-name'
            placeholder='Enter your name'
            value={name}
            setValue={setName}
          />
        </FormField>

        <FormField>
          <FormFieldHeading>
            <FormLabel htmlFor='input-email' text='Enter email' />
          </FormFieldHeading>
          <FormTextInput
            id='input-email'
            placeholder='Enter your email'
            value={email}
            setValue={setEmail}
          />
        </FormField>

        <FormField>
          <FormFieldHeading>
            <FormLabel
              htmlFor='select-user'
              text='Select a User'
            />
          </FormFieldHeading>
          <select
            id='select-user'
            value={user}
            onChange={event => setUser(event.target.value)}
          >
            <option value='none'>None</option>
            <option value='fc'>Final customer</option>
            <option value='wh'>Wholesaler</option>
            <option value='mp'>Market place</option>
          </select>
        </FormField>

        <FormSubmit
          onClick={() => setActiveSection('product-info')}
          isDisabled={!name || !email || user==="none"}
          submitText='Submit'
        />
      </Section>

      <Section isVisible={activeSection === 'product-info'}>
        <SectionHeading>Product information</SectionHeading>

        <FormField>
          <FormFieldHeading>
            <FormLabel htmlFor='input-hash' text='Hash Value' />
          </FormFieldHeading>
          <FormTextInput
            id='input-hash'
            placeholder='Enter your hash'
            value={hash}
            setValue={setHash}
          />
        </FormField>

        <FormField>
          <FormFieldHeading>
            <FormLabel htmlFor='select-maker' text='Maker' />
          </FormFieldHeading>
          <select
            id='select-maker'
            value={maker}
            onChange={event => setMaker(event.target.value)}
          >
            <option value='none' disabled={true}>
              Select the brand of your product
            </option>
            <option value='nk'>Nike</option>
            <option value='fs'>Fossil</option>
            <option value='ch'>Carolina Herrera</option>
            <option value='mt'>Motorola</option>
            <option value='gc'>Gucci</option>
            <option value='fn'>Fendi</option>
            <option value='cr'>Crocs</option>
            <option value='cn'>Chanel N5</option>
            <option value='rx'>Rolex</option>
            <option value='nt'>The North Face</option>
          </select>
        </FormField>

        <FormSubmit
          onClick={() => setActiveSection('verify-prod')}
          isDisabled={!hash || maker === 'none'}
          submitText='Continue'
        />
      </Section>

      <Section isVisible={activeSection === 'verify-prod'}>
        <SectionHeading>Verify the authenticity of your Product</SectionHeading>

        <FormField>
          <FormFieldHeading>
            <FormLabel text='Choose a market place' />
          </FormFieldHeading>
          <div style={{ marginBottom: 5 }}>
            <label htmlFor='input-amazon'>
              <input
                type='radio'
                name='market-place'
                id='input-amazon'
                value='amazon'
                checked={marketPlace === 'amazon'}
                onChange={onChangeMarketPlace}
              />
              &nbsp;Amazon
            </label>
          </div>
          <div style={{ marginBottom: 5 }}>
            <label htmlFor='input-ebay'>
              <input
                type='radio'
                name='market-place'
                id='input-ebay'
                value='ebay'
                checked={marketPlace === 'ebay'}
                onChange={onChangeMarketPlace}
              />
              &nbsp;Ebay
            </label>
          </div>
          <div style={{ marginBottom: 5 }}>
            <label htmlFor='input-olx'>
              <input
                type='radio'
                name='market-place'
                id='input-olx'
                value='olx'
                checked={marketPlace === 'olx'}
                onChange={onChangeMarketPlace}
              />
              &nbsp;OLX
            </label>
          </div>
        </FormField>

        <FormField>
          <label htmlFor='input-verify'>
            <input
              type='checkbox'
              id='input-verify'
              checked={verifyProduct}
              onChange={() => setVerifyProduct(!verifyProduct)}
            />
            <span>Once you verify your product it will be permanently recorded on the Blockchain</span>
          </label>
        </FormField>

        {!hasConnection && (
          <div style={{ marginBottom: 10 }}>
            <ErrorMessage label='You are offline. Go online to save the data.' />
          </div>
        )}

        <FormSubmit
          isDisabled={!marketPlace || !verifyProduct || !hasConnection}
          isLoading={status === 'loading'}
          isComplete={status === 'completed'}
          loadingText='Recording product on the Blockchain'
          completeText='Authenticated!'
          submitText='Verify'
          onClick={verifyData}
        />
      </Section>
    </div>
  )
}

function Section({ children, isVisible }) {
  if (!isVisible) {
    return null
  }

  return <div>{children}</div>
}

function SectionHeading({ children }) {
  return <h2 className='SectionHeading'>{children}</h2>
}

