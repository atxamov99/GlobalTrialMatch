import axios from 'axios'

const BASE_URL = 'https://clinicaltrials.gov/api/v2/studies'

export async function searchTrials({ condition, country, status = 'RECRUITING', pageSize = 20 }) {
  const params = {
    'query.cond': condition,
    'filter.overallStatus': status,
    pageSize,
    format: 'json',
  }

  if (country) {
    params['query.locn'] = country
  }

  const response = await axios.get(BASE_URL, { params })
  const studies = response.data.studies || []

  return studies.map(formatTrial)
}

function formatTrial(study) {
  const proto = study.protocolSection || {}
  const id = proto.identificationModule || {}
  const status = proto.statusModule || {}
  const eligibility = proto.eligibilityModule || {}
  const sponsors = proto.sponsorCollaboratorsModule || {}
  const conditions = proto.conditionsModule || {}
  const contacts = proto.contactsLocationsModule || {}

  const locations = (contacts.locations || []).map(loc => ({
    facility: loc.facility,
    city: loc.city,
    country: loc.country,
    status: loc.status,
  }))

  return {
    id: id.nctId,
    title: id.briefTitle,
    officialTitle: id.officialTitle,
    phase: (status.phases || []).join(', '),
    status: status.overallStatus,
    summary: proto.descriptionModule?.briefSummary,
    sponsor: sponsors.leadSponsor?.name,
    conditions: conditions.conditions || [],
    eligibility: {
      minAge: eligibility.minimumAge,
      maxAge: eligibility.maximumAge,
      gender: eligibility.sex,
      criteria: eligibility.eligibilityCriteria,
    },
    locations,
    url: `https://clinicaltrials.gov/study/${id.nctId}`,
  }
}
