import { useState } from 'react'
import PublicLayout from '../components/PublicLayout'
import Button from '../components/ui/Button'
import Dialog from '../components/ui/Dialog'
import Alert from '../components/ui/Alert'
import Table from '../components/ui/Table'
import Checkbox from '../components/ui/Checkbox'
import Radio from '../components/ui/Radio'
import Input from '../components/ui/Input'
import TextArea from '../components/ui/TextArea'
import Tabs from '../components/ui/Tabs'
import Pagination from '../components/ui/Pagination'
import Tooltip from '../components/ui/Tooltip'
import Progress from '../components/ui/Progress'
import CircularProgress from '../components/ui/CircularProgress'
import { H1, H2, P, Muted, Display, Title1, Title2, Subtitle1, Body1, Body2, Caption1 } from '../components/ui/Typography'

export default function UIPlayground() {
  const [open, setOpen] = useState(false)
  const [openWarn, setOpenWarn] = useState(false)
  const [checked, setChecked] = useState(false)
  const [choice, setChoice] = useState('a')
  const [page, setPage] = useState(2)
  const [progress, setProgress] = useState(45)

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'SKU', accessor: 'sku' },
    { header: 'Price', accessor: 'price', render: (r) => `₩${r.price.toLocaleString()}` },
  ]
  const rows = [
    { name: 'Serum', sku: 'SRM-100', price: 29000 },
    { name: 'Toner', sku: 'TNR-210', price: 19000 },
    { name: 'Cream', sku: 'CRM-330', price: 35000 },
  ]

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        <header className="space-y-2">
          <H1>UI Components Preview</H1>
          <Muted>디자인 시스템 기초 컴포넌트 미리보기</Muted>
        </header>

        <section className="space-y-4">
          <H2 className='mt-5'>Typography</H2>
          <div className="space-y-2">
            <Display>Display 디스플레이</Display>
            <Title1>Title1 타이틀 1</Title1>
            <Title2>Title2 타이틀 2</Title2>
            <Subtitle1>Subtitle1 서브타이틀</Subtitle1>
            <Body1>Body1 본문 기본 스타일입니다. 브랜드 톤에 맞춘 컬러와 줄간격을 적용합니다.</Body1>
            <Body2>Body2 보조 본문 텍스트입니다.</Body2>
            <Caption1>Caption1 캡션/라벨</Caption1>
            <div className="pt-2">
              <H1>(Alias) H1 → Title1</H1>
              <H2>(Alias) H2 → Title2</H2>
              <P>(Alias) P → Body1. 본문 예시입니다.</P>
              <Muted>Muted 보조 설명 텍스트</Muted>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <H2>Buttons</H2>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section className="space-y-4">
          <H2>Dialog</H2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setOpen(true)}>Open Dialog</Button>
            <Button variant="destructive" onClick={() => setOpenWarn(true)}>Open Warning Dialog</Button>
          </div>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            title="Dialog Title"
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setOpen(false)}>Confirm</Button>
              </>
            }
          >
            <P>간단한 다이얼로그 내용입니다. 키보드 ESC 또는 바깥 영역 클릭으로 닫힙니다.</P>
          </Dialog>

          <Dialog
            open={openWarn}
            onClose={() => setOpenWarn(false)}
            title="경고"
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpenWarn(false)}>
                  취소
                </Button>
                <Button variant="destructive" onClick={() => setOpenWarn(false)}>
                  삭제하기
                </Button>
              </>
            }
          >
            <Alert variant="warning" title="주의가 필요합니다">
              이 작업은 되돌릴 수 없습니다. 계속 진행하시겠습니까?
            </Alert>
          </Dialog>
        </section>

        <section className="space-y-4">
          <H2>Alert</H2>
          <div className="space-y-3">
            <Alert title="정보">일반 정보 메시지입니다.</Alert>
            <Alert variant="success" title="성공">작업이 성공적으로 완료되었습니다.</Alert>
            <Alert variant="warning" title="주의">확인이 필요한 사항입니다.</Alert>
            <Alert variant="error" title="오류">문제가 발생했습니다. 다시 시도해 주세요.</Alert>
          </div>
        </section>

        <section className="space-y-4">
          <H2>Table</H2>
          <Table columns={columns} rows={rows} />
        </section>

        <section className="space-y-4">
          <H2>Checkbox & Radio</H2>
          <div className="flex flex-col gap-3">
            <Checkbox label="약관에 동의합니다" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <div className="flex items-center gap-4">
              <Radio name="opt" label="옵션 A" value="a" checked={choice === 'a'} onChange={() => setChoice('a')} />
              <Radio name="opt" label="옵션 B" value="b" checked={choice === 'b'} onChange={() => setChoice('b')} />
              <Radio name="opt" label="옵션 C" value="c" checked={choice === 'c'} onChange={() => setChoice('c')} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <H2>Inputs</H2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="이름" placeholder="홍길동" description="주문자 성함을 입력하세요" />
            <Input label="이메일" type="email" placeholder="you@example.com" />
            <Input label="휴대폰" type="tel" placeholder="010-0000-0000" />
            <Input label="가격" type="number" placeholder="0" suffix="원" />
            <Input label="오류 예시" placeholder="잘못된 값" error="형식이 올바르지 않습니다" />
          </div>
          <div className="grid gap-4">
            <TextArea label="메모" placeholder="요청 사항을 입력하세요" description="최대 500자" rows={5} />
            <TextArea label="오류 예시" placeholder="내용을 입력하세요" error="내용을 입력해 주세요" />
          </div>
        </section>
        <section className="space-y-4">
          <H2>Tabs</H2>
          <Tabs
            tabs={[
              { label: '탭 1', value: 't1', content: () => <Body2>탭 1 내용</Body2> },
              { label: '탭 2', value: 't2', content: () => <Body2>탭 2 내용</Body2> },
              { label: '탭 3', value: 't3', content: () => <Body2>탭 3 내용</Body2> },
            ]}
          />
        </section>

        <section className="space-y-4">
          <H2>Pagination</H2>
          <Pagination page={page} total={10} onChange={setPage} />
        </section>

        <section className="space-y-4">
          <H2>Tooltip</H2>
          <div className="flex items-center gap-4">
            <Tooltip content="툴팁 내용" side="top">
              <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="툴팁 내용" side="bottom">
              <Button variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="툴팁 내용" side="left">
              <Button variant="outline">Left</Button>
            </Tooltip>
            <Tooltip content="툴팁 내용" side="right">
              <Button variant="outline">Right</Button>
            </Tooltip>
          </div>
        </section>

        <section className="space-y-4">
          <H2>Progress</H2>
          <div className="flex items-center gap-3">
            <Progress value={progress} />
            <Button size="sm" variant="secondary" onClick={() => setProgress((p) => Math.max(0, p - 10))}>-10%</Button>
            <Button size="sm" onClick={() => setProgress((p) => Math.min(100, p + 10))}>+10%</Button>
          </div>
        </section>

        <section className="space-y-4">
          <H2>Loading</H2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CircularProgress size="sm" />
              <Body2>Small</Body2>
            </div>
            <div className="flex items-center gap-2">
              <CircularProgress size="md" />
              <Body2>Medium</Body2>
            </div>
            <div className="flex items-center gap-2">
              <CircularProgress size="lg" />
              <Body2>Large</Body2>
            </div>
            <div className="flex items-center gap-2">
              <Button disabled>
                <CircularProgress size="sm" color="white" className="mr-2" />
                로딩 중
              </Button>
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  )
}
