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

  public async getCollectionId(name: string) {
    type CollectionItem = {
      _id: string
      title: string
    }

    type CollectionsResponse = {
      items: CollectionItem[]
    }

    const res: CollectionsResponse = await this.request('/collections')
    const col = res.items.find((c: CollectionItem) => c.title === name)

    if (!col) {
      throw new Error(`Collection ${name} not found`)
    }

    return col._id
  }

  public async create(link: string, collection: string, title?: string) {
    return await this.request('/raindrop', {
      method: 'POST',
      body: JSON.stringify({
        link: link,
        title: title,
        collectionId: collection,
      }),
    })
  }
}

const raindrop = new Raindrop({
  token: process.env.RAINDROP_TOKEN!,
})

export default raindrop
