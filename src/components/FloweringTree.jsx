import React, { useEffect, useRef } from 'react';
import './FloweringTree.css';
import Scene from 'scenejs';

const FloweringTree = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Scene.js animation code, selectors scoped to root
    const sceneTree = new Scene({
      '.tree': {
        0: { transform: 'scale(0)' },
        1.5: { transform: 'scale(1)' },
      },
      '.background>.flower': function (i) {
        return {
          0: { opacity: 0, transform: 'translateY(0px) rotate(0deg)' },
          1: { opacity: 1 },
          4: { opacity: 1 },
          5: { opacity: 0, transform: 'translateY(300px) rotate(360deg)' },
          options: {
            delay: 7 + i,
            iterationCount: 'infinite',
          },
        };
      },
    }, {
      selector: true,
      // Scope selector to this component only
      // Scene.js will use root.querySelectorAll
      // We'll patch selector to use root as context
      context: root
    });

    // Patch Scene.js selector to use root as context
    const origQuerySelectorAll = document.querySelectorAll;
    document.querySelectorAll = function(sel) {
      if (root) return root.querySelectorAll(sel);
      return origQuerySelectorAll.call(document, sel);
    };

    // Branch/leaf/flower animation
    const branchs = root.querySelectorAll('.tree .branch, .tree .leaf, .tree .flower1');
    const depths = [0, 0, 0];
    for (let i = 0; i < branchs.length; ++i) {
      const sceneItem = sceneTree.newItem('item' + i);
      const className = branchs[i].className;
      if (~className.indexOf('branch-inner')) {
        ++depths[1];
        depths[2] = 0;
      } else if (~className.indexOf('branch')) {
        ++depths[0];
        depths[1] = 0;
        depths[2] = 0;
      } else if (~className.indexOf('leaf') || ~className.indexOf('flower1')) {
        ++depths[2];
      }
      sceneItem.setElement(branchs[i]);
      sceneItem.setCSS(0, ['transform']);
      const time = 1 + depths[0] * 0.5 + depths[1] * 0.5 + depths[2] * 0.5;
      sceneItem.set(time, 'transform', 'scale', 0);
      sceneItem.set(time + 1, 'transform', 'scale', 1);
    }
    sceneTree.playCSS();

    // Restore document.querySelectorAll after mount
    return () => {
      document.querySelectorAll = origQuerySelectorAll;
    };
  }, []);

  return (
    <div ref={containerRef} className="flowering-tree-root">
      <div className="background">
        <div className="flower roundpetal petal5 flower1">
          <div className="petal">
            <div className="petal">
              <div className="petal"></div>
            </div>
          </div>
        </div>
        <div className="flower roundpetal petal5 flower2 blueflower">
          <div className="petal">
            <div className="petal">
              <div className="petal"></div>
            </div>
          </div>
        </div>
        <div className="flower roundpetal petal5 flower3 yellowflower">
          <div className="petal">
            <div className="petal">
              <div className="petal"></div>
            </div>
          </div>
        </div>
        <div className="flower roundpetal petal5 flower4 purpleflower">
          <div className="petal">
            <div className="petal">
              <div className="petal"></div>
            </div>
          </div>
        </div>
        <div className="slope"></div>
        <div className="tree">
          <div className="leaf leaf1"></div>
          <div className="leaf leaf2"></div>
          <div className="branch left branch1">
            <div className="branch left branch-inner1">
              <div className="leaf leaf1"></div>
              <div className="leaf leaf2"></div>
              <div className="leaf leaf3"></div>
              <div className="heart flower1 blueflower"></div>
            </div>
            <div className="branch left branch-inner2">
              <div className="leaf leaf1"></div>
              <div className="leaf leaf2"></div>
              <div className="leaf leaf3"></div>
              <div className="tulip flower1 redflower"><div className="peak"></div></div>
            </div>
            <div className="branch left branch-inner3">
              <div className="leaf leaf1"></div>
              <div className="leaf leaf2"></div>
            </div>
            <div className="flower petal5 flower1 redflower">
              <div className="petal">
                <div className="petal">
                  <div className="petal"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="branch right branch2">
            <div className="branch left branch-inner1">
              <div className="leaf leaf1"></div>
              <div className="leaf leaf2"></div>
              <div className="leaf leaf3"></div>
              <div className="flower petal5 flower1 blueflower">
                <div className="petal">
                  <div className="petal">
                    <div className="petal"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="branch right branch-inner2">
              <div className="leaf leaf1"></div>
              <div className="leaf leaf2"></div>
              <div className="leaf leaf3"></div>
              <div className="tulip flower1 greenflower"><div className="peak"></div></div>
            </div>
            <div className="branch right branch-inner3">
              <div className="leaf leaf1"></div>
              <div className="leaf leaf2"></div>
              <div className="leaf leaf3"></div>
              <div className="branch left branch-inner4">
                <div className="leaf leaf1"></div>
                <div className="flower petal5 flower1 yellowflower">
                  <div className="petal">
                    <div className="petal">
                      <div className="petal"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tulip flower1 purpleflower"><div className="peak"></div></div>
            </div>
            <div className="flower petal5 roundpetal flower1">
              <div className="petal">
                <div className="petal">
                  <div className="petal">
                    <div className="petal"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="branch left branch3">
            <div className="branch right branch-inner1">
              <div className="leaf leaf1"></div>
              <div className="leaf leaf2"></div>
              <div className="leaf leaf3"></div>
              <div className="heart flower1"></div>
            </div>
            <div className="branch left branch-inner2">
              <div className="leaf leaf1"></div>
              <div className="leaf leaf2"></div>
              <div className="leaf leaf3"></div>
              <div className="tulip flower1"><div className="peak"></div></div>
            </div>
            <div className="leaf leaf1"></div>
            <div className="leaf leaf2"></div>
            <div className="flower roundpetal petal5 flower1 purpleflower">
              <div className="petal">
                <div className="petal">
                  <div className="petal"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="branch right branch4">
            <div className="branch left branch-inner1">
              <div className="leaf leaf1"></div>
              <div className="leaf leaf2"></div>
              <div className="leaf leaf3"></div>
              <div className="flower petal5 flower1 yellowflower">
                <div className="petal">
                  <div className="petal">
                    <div className="petal"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="branch right branch-inner2">
              <div className="leaf leaf1"></div>
              <div className="leaf leaf2"></div>
              <div className="leaf leaf3"></div>
              <div className="tulip tulip1 flower1 purpleflower"><div className="peak"></div></div>
            </div>
            <div className="flower petal5 roundpetal flower1">
              <div className="petal">
                <div className="petal">
                  <div className="petal">
                    <div className="petal"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="branch left branch5">
            <div className="branch right branch-inner1">
              <div className="leaf leaf1"></div>
              <div className="leaf leaf2"></div>
              <div className="leaf leaf3"></div>
              <div className="heart flower1"></div>
            </div>
            <div className="branch left branch-inner2">
              <div className="leaf leaf1"></div>
              <div className="leaf leaf2"></div>
              <div className="leaf leaf3"></div>
              <div className="tulip flower1 greenflower"><div className="peak"></div></div>
            </div>
            <div className="flower roundpetal petal5 flower1 blueflower">
              <div className="petal">
                <div className="petal">
                  <div className="petal"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloweringTree; 