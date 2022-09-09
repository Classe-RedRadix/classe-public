import { CONTACT_PAGE } from '../constants'
import { withKonami, withMenu } from '../hocs'
import { useBreadcrumbListSchema, useSchema, useTranslations } from '../hooks'
import InfoHead from '../InfoHead'

const Contact = withKonami(({ interestedIn }) => {
  const formatMessage = useTranslations()
  const { contactPageSchema } = useSchema()
  const { breadcrumbListSchema } = useBreadcrumbListSchema([
    {
      name: formatMessage('schema-breadcrumb-list:home-name'),
      url: formatMessage('url:root'),
    },
    {
      name: formatMessage('schema-breadcrumb-list:contact-name'),
      url: formatMessage('url:contact'),
    },
  ])

  const infoHead = (
    <InfoHead
      title={formatMessage('info-head-contact:title')}
      description={formatMessage('info-head-contact:description')}
      url={formatMessage('url:contact')}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `[${contactPageSchema}, ${breadcrumbListSchema}]`,
        }}
      />
    </InfoHead>
  )

  return withMenu(CONTACT_PAGE, {
    infoHead,
    useMenuConfig: { defaultIsContactOpen: true },
    useContactFormConfig: { interestedIn },
  })
})

Contact.getInitialProps = async ({ query }) => {
  // if `interestedIn !== undefined` means that the user came here by clicking on
  // a course's `Contact us` link
  const interestedIn = query['interested-in']

  return {
    interestedIn,
  }
}

export default Contact
