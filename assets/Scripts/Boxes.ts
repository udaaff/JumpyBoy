import { _decorator, CCInteger, Component, instantiate, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Boxes')
export class Boxes extends Component {
    @property({ type: Prefab })
    private boxPrefab: Prefab | null;

    @property({ type: CCInteger })
    private numBoxes = 8;

    protected override onLoad(): void {
        this.node.removeAllChildren();

        for (let i = 1; i <= this.numBoxes; i++) {
            const box = instantiate(this.boxPrefab);
            this.node.addChild(box);

            box.setPosition(new Vec3(
                -0.5 + Math.random(),
                0,
                (i + 2) * 10 - 2 + 4 * Math.random()
            ));
        }
    }
}


