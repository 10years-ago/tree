import { data } from '../../lib/data'
import { useState } from 'react'
import { dt } from '../../lib/decision-tree1'

export default function Home () {
  // 刪除的列
  // const [delFeatures, setDelFeatures] = useState(['building_num'])
  // 樣本標籤列
  // const [features, setFeatures] = useState(['has_old_people', 'has_child', 'floor_num', 'is_usual_residence'])
  // const [config, setConfig] = useState({
  //   trainingSet: data,
  //   categoryAttr: 'voted',
  //   ignoredAttributes: ['building_num']
  // })
  const [temVail, setTemVail] = useState([1, 1, 24, 0])
  const [vail, setVail] = useState({
    // building_num: 1,
    has_old_people: 1,
    has_child: 1,
    floor_num: 24,
    is_usual_residence: 0
  })

  // Configuration
  var config = {
    trainingSet: data,
    categoryAttr: 'voted',
    ignoredAttributes: ['building_num']
  }

  // Building Decision Tree
  var decisionTree = new dt.DecisionTree(config)

  // Building Random Forest
  const numberOfTrees = 600
  var randomForest = new dt.RandomForest(config, numberOfTrees)

  // Testing Decision Tree and Random Forest
  // var comic = { has_old_people: 1, has_child: 1, floor_num: 24, is_usual_residence: 0 }

  var decisionTreePrediction = decisionTree.predict(vail)
  var randomForestPrediction = randomForest.predict(vail)

  // Recursive (DFS) function for displaying inner structure of decision tree
  console.log(randomForestPrediction[1])
  function treeToHtml (tree) {
    if (tree.category) {
      return (
        <ul>
          <li>
            <a href='#'>
              <b>{tree.category}</b>
            </a>
          </li>
        </ul>
      )
    }

    return (
      <ul>
        <li>
          <a href='#'>
            <b>{tree.attribute} {tree.predicateName} {tree.pivot} ?</b>
          </a>
          <ul>
            <li>
              <a href='#'>yes</a>
              {treeToHtml(tree.match)}
            </li>
            <li>
              <a href='#'>no</a>
              {treeToHtml(tree.notMatch)}
            </li>
          </ul>
        </li>
      </ul>
    )
  }
  return (
    <>
      <div className='flex'>
        <div style={{ width: '1000px' }}>
          <h3 className='text-xl font-bold pb-10'>
            不需要驗證的標籤列: 棟別
          </h3>
          <b>驗證：</b>
          <div className='w-auto text-center'>
            <div className='flex'>
              {/* <span className='w-1/6'>棟別</span> */}
              <span className='w-1/6'>是否有老人</span>
              <span className='w-1/6'>是否有小孩</span>
              <span className='w-1/6'>樓層</span>
              <span className='w-1/6'>是否常住</span>
            </div>
            <div className='flex'>
              <input
                className='w-1/6 px-1 border-black border-2 mx-1'
                value={temVail[0]}
                onChange={e => setTemVail([e.target.value, temVail[1], temVail[2], temVail[3], temVail[4]])}
              />
              <input className='w-1/6 px-1 border-black border-2 mx-1' value={temVail[1]} onChange={e => setTemVail([temVail[0], e.target.value, temVail[2], temVail[3], temVail[4]])} />
              <input className='w-1/6 px-1 border-black border-2 mx-1' value={temVail[2]} onChange={e => setTemVail([temVail[0], temVail[1], e.target.value, temVail[3], temVail[4]])} />
              <input className='w-1/6 px-1 border-black border-2 mx-1' value={temVail[3]} onChange={e => setTemVail([temVail[0], temVail[1], temVail[2], e.target.value, temVail[4]])} />
              {/* <input className='w-1/6 px-1 border-black border-2 mx-1' value={temVail[4]} onChange={e => setTemVail([temVail[0], temVail[1], temVail[2], temVail[3], e.target.value])} /> */}
              <button
                className='w-20 bg-blue-700 hover:bg-blue-600 text-white border-gray-400'
                onClick={() => {
                  setVail({
                    // building_num: String(temVail[0]),
                    has_old_people: String(temVail[0]),
                    has_child: String(temVail[1]),
                    floor_num: String(temVail[2]),
                    is_usual_residence: String(temVail[3])
                  })
                }}
              >
                    驗證
              </button>
            </div>
            <h3 className='text-xl font-bold pb-5'>
                驗證結果：{decisionTreePrediction === '1' ? '讚成' : '反對'}
            </h3>
          </div>
          <br />
          {/* <b>隨機森林預測</b> */}
          {/* <div id='randomForestPrediction'>
            <p>
            讚成概率：
              {
                randomForestPrediction[1] ? (randomForestPrediction[1] / numberOfTrees).toFixed(2) * 100 : 0
              }%
            </p>
            <p>
            不讚成概率：
              {
                randomForestPrediction[0] ? (randomForestPrediction[0] / numberOfTrees).toFixed(2) * 100 : 0
              }%
            </p>
          </div> */}
          {/* 訓練的數據 */}
          <div className='text-center' style={{ width: '600px' }}>
            <h1 className='text-xl font-bold'>
              這是訓練的數據
            </h1>
            <div className='flex w-full'>
              <span className=' w-20 mr-2'>棟別</span>
              <span className='w-20 mr-2'>是否有老人</span>
              <span className='w-20 mr-2'>是否有小孩</span>
              <span className='w-20 mr-2'>樓層</span>
              <span className='w-20 mr-2'>是否常住</span>
              <span className='w-20 mr-2'>是否讚成</span>
              {/* <span className='w-20 mr-2'>操作</span> */}
            </div>
            <div className='h-px bg-black my-2' />
            {
              data.map((item, index) => {
                return (
                  <div key={index} className='flex w-full my-2 text-center'>
                    <span className='w-20 mr-2'>{item.building_num}</span>
                    <span className='w-20 mr-2'>{item.has_old_people === '1' ? '是' : '否'}</span>
                    <span className='w-20 mr-2'>{item.has_child === '1' ? '是' : '否'}</span>
                    <span className='w-20 mr-2'>{item.floor_num}</span>
                    <span className='w-20 mr-2'>{item.is_usual_residence === '1' ? '是' : '否'}</span>
                    <span className='w-20 mr-2'>{item.voted ? '讚成' : '不讚成'}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* 樹 */}
        <div>
          <h1 className=' text-xl'>Decision Tree:</h1>
          <div className='tree' id='displayTree' style={{ width: '7000px' }}>
            {
              treeToHtml(decisionTree.root)
            }
          </div>
        </div>
      </div>
      <style global jsx>
        {
          `
          * {
          margin: 0;
          padding: 0;
      }
      
      .tree ul {
        padding-top: 20px;
          position: relative;
        
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
      }
      
      .tree li {
          white-space: nowrap;
        float: left;
          text-align: center;
        list-style-type: none;
        position: relative;
        padding: 20px 5px 0 5px;
        
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
      }
      
      .tree li::before, .tree li::after{
        content: '';
        position: absolute;
          top: 0;
          right: 50%;
        border-top: 1px solid #ccc;
        width: 50%;
          height: 20px;
      }
      .tree li::after{
        right: auto;
          left: 50%;
        border-left: 1px solid #ccc;
      }
      
      .tree li:only-child::after, .tree li:only-child::before {
        display: none;
      }
      
      .tree li:only-child{
          padding-top: 0;
      }

      .tree li:first-child::before, .tree li:last-child::after{
        border: 0 none;
      }

      .tree li:last-child::before{
        border-right: 1px solid #ccc;
        border-radius: 0 5px 0 0;
        -webkit-border-radius: 0 5px 0 0;
        -moz-border-radius: 0 5px 0 0;
      }
      .tree li:first-child::after{
        border-radius: 5px 0 0 0;
        -webkit-border-radius: 5px 0 0 0;
        -moz-border-radius: 5px 0 0 0;
      }
      
      .tree ul ul::before{
        content: '';
        position: absolute;
          top: 0;
          left: 50%;
        border-left: 1px solid #ccc;
        width: 0;
          height: 20px;
      }
      
      .tree li a{
        border: 1px solid #ccc;
        padding: 5px 10px;
        text-decoration: none;
        color: #666;
        font-family: arial, verdana, tahoma;
        font-size: 11px;
        display: inline-block;
        
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
      }
      
      .tree li a:hover, .tree li a:hover+ul li a {
        background: #c8e4f8;
          color: #000;
          border: 1px solid #94a0b4;
      }
      /*Connector styles on hover*/
      .tree li a:hover+ul li::after,
      .tree li a:hover+ul li::before,
      .tree li a:hover+ul::before,
      .tree li a:hover+ul ul::before{
        border-color:  #94a0b4;
      }
          `
        }
      </style>
    </>
  )
}
