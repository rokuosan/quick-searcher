import { Noto_Sans_JP } from "@next/font/google"
import { ReactNode } from "react"
import { ZennArticle } from "../types/ZennArticle"

type Props = {
  article: ZennArticle,
  children: ReactNode
}

const font = Noto_Sans_JP({ weight: '400', subsets: ['latin'] })

const ZennArticleCard = (props: Props) => {
  const a = props.article

  return (
    <>
      <a href={`https://zenn.dev/${a.user.username}/articles/${a.slug}`} target="_blank">
        <div className={"leading-relaxed max-w-lg p-4 rounded-lg bg-white border-2 border-white hover:border-sky-400 " + font.className}>
          <div className="pb-2">@{a.user.name}</div>
          <div className="flex items-center">
            <div className="text-3xl bg-gray-100 p-3 min-h-[64px] min-w-[64px] mr-2 rounded-xl">
              <p className="w-fit mx-auto"> {a.emoji} </p>
            </div>
            <h4 className="text-2xl max-w-sm" >{a.title}</h4>
          </div>
          <div className="pt-2">
            <i className="fa-regular fa-heart"></i>
            <span className="pl-2">
              {a.liked_count}
            </span>
          </div>
          {props.children}
        </div>
      </a>
    </>
  )

}

export default ZennArticleCard
