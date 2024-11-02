import { _decorator, CCInteger, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Boxes')
export class Boxes extends Component {
    @property({ type: Prefab })
    private boxPrefab!: Prefab | null;

    @property({ type: CCInteger })
    private numBoxes = 8;

    protected override onLoad(): void {
        for (let i = 1; i <= this.numBoxes; i++) {
            const box = instantiate(this.boxPrefab) as unknown as Node;
            this.node.addChild(box);

            box.setPosition(new Vec3(
                -0.5 + Math.random(),
                0,
                (i + 1) * 10 - 2 + 4 * Math.random()
            ));
            box.setRotationFromEuler(0, -50 + 100 * Math.random(), 0);
        }
    }
}


