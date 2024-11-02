import { _decorator, Component, EventMouse, EventTouch, Input, input, SkeletalAnimation, Tween, tween, Vec3 } from 'cc';
const { ccclass } = _decorator;

const JUMP_HEIGHT = 3.5;
const JUMP_DURATION = 0.5;

@ccclass('PlayerBody')
export class PlayerBody extends Component {
    private _isJumping = false;
    private _isRunning = false;
    private _animation: SkeletalAnimation | null;
    private _jumpTween: Tween | null;

    protected override onLoad(): void {
        this._animation = this.getComponent(SkeletalAnimation);
    }

    private onTouchStart(_event: EventTouch): void {
        this.jump();
    }

    private onJumpComplete(): void {
        this._animation.crossFade("Root|Run");
        this._isJumping = false;
    }

    public run(): void {
        if (this._isRunning)
            return;

        this._isRunning = true;
        this._animation.crossFade("Root|Run");
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    public reset(): void {
        if (!this._isRunning)
            return;

        this._isRunning = false;
        this._isJumping = false;
        this._animation.crossFade("Root|Idle");
        this.node.setPosition(new Vec3(0, 0, 0));
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    public stop(): void {
        this._animation.crossFade("Root|Idle");
        this._isRunning = false;
        if (this._isJumping) {
            this._isJumping = false;
            this._jumpTween.stop();
        }
    }

    private jump(): void {
        if (!this._isRunning || this._isJumping)
            return;

        this._isJumping = true;
        this._animation.crossFade("Root|Jump");

        this._jumpTween = tween(this.node)
            .by(JUMP_DURATION, { position: new Vec3(0, JUMP_HEIGHT, 0) }, { easing: 'smooth' })
            .by(JUMP_DURATION, { position: new Vec3(0, -JUMP_HEIGHT, 0) }, { easing: 'smooth' })
            .call(this.onJumpComplete, this)
            .start();
    }
}


