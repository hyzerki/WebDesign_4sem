import './App.css';
import Hierarchy from './Hierarchy';
import { ErrorBoundary } from 'react-error-boundary'
import HierarchyFallback from './HierarchyFallback';


function App() {
  const hierarchy = [{
    id: 1,
    name: "folder1",
    icon: "/icons/folder.svg",
    childs: [{
      id: 2,
      name: "folder2",
      icon: "/icons/folder.svg",
      onClick: function (id) {
        console.log(id);
      },
      childs: [{
        id: "1",
        name: "image.png",
        icon: "/icons/image.svg",
        onClick: function (id) {
          console.log(id);
        }
      }, {
        id: "1",
        name: "image1.png",
        icon: "/icons/image.svg",
        onClick: function (id) {
          console.log(id);
        }
      }]
    }]
  }, {
    id: 3,
    name: "folder3",
    icon: "/icons/folder.svg",
    childs: [{
      id: 4,
      name: "folder4",
      icon: "/icons/folder.svg",
      childs: [{
        id: 5,
        name: "text.txt",
        icon: "/icons/text.svg",
        onClick: ""
      }]
    }]
  }];

  return (
    <ErrorBoundary FallbackComponent={HierarchyFallback}>
      <Hierarchy childs={hierarchy} />
    </ErrorBoundary>
  );
}

export default App;
