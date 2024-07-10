if (!process.env.RAINDROP_TOKEN) {
  throw new Error('Missing RAINDROP_TOKEN')
}

const url = 'https://api.raindrop.io/rest/v1'

type RaindropConfig = {
  token: string
}

class Raindrop {
  private config: RaindropConfig

  constructor(config: RaindropConfig) {
    this.config = config
  }

  private async request<T>(endpoint: string, opts?: RequestInit) {
    const res = await fetch(`${url}/${endpoint}`, {
      ...opts,
      headers: {
        ...opts?.headers,
        Authorization: `Bearer ${this.config.token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(
        `${endpoint} request failed (${res.status}): ${res.statusText}`,
      )
    }

    return (await res.json()) as T
  }

  public async collection(name: string) {
    type CollectionItem = {
      _id: string
      title: string
    }

    type CollectionsResponse = {
      items: CollectionItem[]
    }

    const res: CollectionsResponse = await this.request('/collections')
    const result = res.items.find((c: CollectionItem) => c.title === name)

    return result?._id ?? null
  }
}

const raindrop = new Raindrop({
  token: process.env.RAINDROP_TOKEN,
})

export default raindrop
