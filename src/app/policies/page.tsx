'use client';

import { useState } from 'react';

export default function TermsAndPrivacy() {
  const [activeTab, setActiveTab] = useState('terms');

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          規約とプライバシーポリシー
        </h1>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('terms')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'terms'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                利用規約
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'privacy'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                プライバシーポリシー
              </button>
            </nav>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {activeTab === 'terms' ? (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">利用規約</h2>
                <p>
                  この利用規約（以下，「本規約」といいます。）は，ハスキー（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
                </p>
                {/* 利用規約の詳細をここに追加 */}
              </div>
            ) : (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">プライバシーポリシー</h2>
                <p>
                  ハスキー（以下，「当社」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
                </p>
                <h3 className="text-xl font-semibold mt-4 mb-2">第1条（個人情報）</h3>
                <p>
                  「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
                </p>
                <h3 className="text-xl font-semibold mt-4 mb-2">第2条（個人情報の収集方法）</h3>
                <p>
                  当社は，ユーザーが利用登録をする際に氏名，生年月日，住所，電話番号，メールアドレス，銀行口座番号，クレジットカード番号，運転免許証番号などの個人情報をお尋ねすることがあります。また，ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を,当社の提携先（情報提供元，広告主，広告配信先などを含みます。以下，｢提携先｣といいます。）などから収集することがあります。
                </p>
                {/* 第3条から第10条までをここに追加 */}
                <h3 className="text-xl font-semibold mt-4 mb-2">第10条（お問い合わせ窓口）</h3>
                <p>
                  本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。
                </p>
                <p>
                  住所：教えなーい<br />
                  社名：ハスキー株式会社<br />
                  代表取締役：仲宗根幹太<br />
                  担当部署：柴犬<br />
                  Eメールアドレス：kanta@gmail.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
